// PS1Renderer: renders the real scene into a low internal-resolution target
// (NearestFilter, so it upsamples blocky/pixelated) then composites it to the
// screen through an ordered-dithering + color-quantization shader pass.
// This is a minimal hand-rolled composer (no EffectComposer addon needed,
// since the vendored classic-build three.min.js doesn't bundle post-processing
// addons) - just a render-to-texture + fullscreen-quad shader.
(function () {
  var DITHER_FRAG = [
    'precision mediump float;',
    'uniform sampler2D tDiffuse;',
    'uniform vec2 uResolution;',
    'uniform float uColorLevels;',
    'uniform float uDitherStrength;',
    'varying vec2 vUv;',

    'float bayer4x4(vec2 p){',
    '  int x = int(mod(p.x, 4.0));',
    '  int y = int(mod(p.y, 4.0));',
    '  int idx = x + y * 4;',
    '  float m[16];',
    '  m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;',
    '  m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;',
    '  m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;',
    '  m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;',
    '  for (int i=0;i<16;i++){ if (i==idx) return m[i]; }',
    '  return 0.0;',
    '}',

    'void main(){',
    '  vec4 texel = texture2D(tDiffuse, vUv);',
    '  vec2 fragCoord = vUv * uResolution;',
    '  float threshold = (bayer4x4(fragCoord) / 16.0) - 0.5;',
    '  vec3 dithered = texel.rgb + threshold * uDitherStrength;',
    '  vec3 quantized = floor(dithered * uColorLevels + 0.5) / uColorLevels;',
    '  gl_FragColor = vec4(clamp(quantized, 0.0, 1.0), texel.a);',
    '}'
  ].join('\n');

  var DITHER_VERT = [
    'varying vec2 vUv;',
    'void main(){',
    '  vUv = uv;',
    '  gl_Position = vec4(position.xy, 0.0, 1.0);',
    '}'
  ].join('\n');

  function PS1Renderer(renderer, config) {
    this.renderer = renderer;
    this.enabled = true;
    this.internalHeight = (config && config.internalHeight) || 240;

    this.renderTarget = new THREE.WebGLRenderTarget(4, 4, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat
    });

    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: this.renderTarget.texture },
        uResolution: { value: new THREE.Vector2(4, 4) },
        uColorLevels: { value: 24.0 },
        uDitherStrength: { value: 0.045 }
      },
      vertexShader: DITHER_VERT,
      fragmentShader: DITHER_FRAG,
      depthTest: false,
      depthWrite: false
    });
    this.quadScene = new THREE.Scene();
    this.quadMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.quadMaterial);
    this.quadScene.add(this.quadMesh);

    this._lastW = 0;
    this._lastH = 0;
  }

  PS1Renderer.prototype.setEnabled = function (enabled) {
    this.enabled = enabled;
  };

  PS1Renderer.prototype.resize = function (width, height) {
    this.renderer.setSize(width, height, false);
    var aspect = width / height;
    var internalH = this.internalHeight;
    var internalW = Math.round(internalH * aspect);
    if (internalW === this._lastW && internalH === this._lastH) return;
    this._lastW = internalW;
    this._lastH = internalH;
    this.renderTarget.setSize(internalW, internalH);
    this.quadMaterial.uniforms.uResolution.value.set(internalW, internalH);
  };

  PS1Renderer.prototype.render = function (scene, camera) {
    if (!this.enabled) {
      this.renderer.setRenderTarget(null);
      this.renderer.render(scene, camera);
      return;
    }
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.quadScene, this.quadCamera);
  };

  AK.core.PS1Renderer = PS1Renderer;
})();
