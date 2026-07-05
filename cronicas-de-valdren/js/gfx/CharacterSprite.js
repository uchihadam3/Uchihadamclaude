// CharacterSprite: procedural pixel-art humanoid generator (16x24 canvas per
// frame). Rather than hand-authoring every animation frame pixel-by-pixel
// (impractical for a full cast), a small set of pose parameters (facing,
// stride offset, arm swing, bob) drives a block-based pixel renderer, and
// each resulting frame is baked once to an offscreen canvas and cached -
// the same "procedural rig, cached bake" philosophy used for Lia's 3D rig
// in Ashen Kennel, adapted to 2D.
(function () {
  var W = 16, H = 24;

  function px(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  // Draws the front/back (down/up) pose. `facingUp` hides the face and
  // shows more hair coverage (back of the head).
  function drawFrontBack(ctx, pal, facingUp, strideA, armSwing) {
    var legShiftL = strideA ? 1 : -1;
    var legShiftR = -legShiftL;

    // legs (drawn first so torso overlaps the hip line)
    px(ctx, 5, 16 + Math.max(0, legShiftL), 3, 7 - Math.max(0, legShiftL), pal.pants);
    px(ctx, 9, 16 + Math.max(0, legShiftR), 3, 7 - Math.max(0, legShiftR), pal.pants);
    px(ctx, 5, 22 + Math.max(0, legShiftL), 3, 1, pal.shoe);
    px(ctx, 9, 22 + Math.max(0, legShiftR), 3, 1, pal.shoe);

    // arms (swing opposite to the leading leg)
    var armL = armSwing ? 0 : 1, armR = armSwing ? 1 : 0;
    px(ctx, 2, 9 + armL, 3, 6, pal.sleeve);
    px(ctx, 11, 9 + armR, 3, 6, pal.sleeve);

    // torso
    px(ctx, 4, 9, 8, 8, pal.outfit);
    px(ctx, 4, 14, 8, 1, pal.outfitShade);

    // head
    if (facingUp) {
      px(ctx, 5, 2, 6, 7, pal.hair);
    } else {
      px(ctx, 5, 2, 6, 3, pal.hair);
      px(ctx, 5, 5, 6, 4, pal.skin);
      px(ctx, 6, 7, 1, 1, pal.eye);
      px(ctx, 9, 7, 1, 1, pal.eye);
    }
    px(ctx, 4, 8, 8, 1, pal.hairShade);
  }

  // Side profile (right-facing); left is this mirrored at blit time.
  function drawSide(ctx, pal, strideA, armSwing) {
    var legFrontX = strideA ? 9 : 6;
    var legBackX = strideA ? 6 : 9;
    px(ctx, legBackX, 16, 3, 6, pal.pantsShade);
    px(ctx, legFrontX, 17, 3, 7, pal.pants);
    px(ctx, legFrontX, 23, 3, 1, pal.shoe);
    px(ctx, legBackX, 21, 3, 1, pal.shoe);

    px(ctx, armSwing ? 9 : 6, 10, 3, 6, pal.sleeve);

    px(ctx, 5, 9, 7, 8, pal.outfit);
    px(ctx, 5, 14, 7, 1, pal.outfitShade);

    px(ctx, 6, 2, 5, 3, pal.hair);
    px(ctx, 6, 5, 5, 4, pal.skin);
    px(ctx, 10, 7, 1, 1, pal.eye);
    px(ctx, 4, 8, 8, 1, pal.hairShade);
  }

  function bake(drawFn) {
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    drawFn(ctx);
    return c;
  }

  // Builds the full frame set for one character palette. Returns:
  // { down:[idle,walkA,walkB], up:[...], right:[...], left:[...] (mirrored) }
  function buildFrameSet(pal) {
    var set = {};
    set.down = [
      bake(function (ctx) { drawFrontBack(ctx, pal, false, null, false); }),
      bake(function (ctx) { drawFrontBack(ctx, pal, false, true, true); }),
      bake(function (ctx) { drawFrontBack(ctx, pal, false, false, false); })
    ];
    set.up = [
      bake(function (ctx) { drawFrontBack(ctx, pal, true, null, false); }),
      bake(function (ctx) { drawFrontBack(ctx, pal, true, true, true); }),
      bake(function (ctx) { drawFrontBack(ctx, pal, true, false, false); })
    ];
    set.right = [
      bake(function (ctx) { drawSide(ctx, pal, true, false); }),
      bake(function (ctx) { drawSide(ctx, pal, true, true); }),
      bake(function (ctx) { drawSide(ctx, pal, false, false); })
    ];
    // 'left' reuses the 'right' bakes; the renderer flips them on blit.
    set.left = set.right;
    return set;
  }

  RPG.gfx.CharacterSprite = { W: W, H: H, buildFrameSet: buildFrameSet };
})();
