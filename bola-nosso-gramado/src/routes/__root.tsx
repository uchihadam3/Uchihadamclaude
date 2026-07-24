import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { initChatNotify, stopChatNotify } from "@/lib/chatNotify";
import { CrashCatcher } from "@/components/CrashCatcher";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Impede tradução automática (Chrome/Google Translate no Android) que
      // reescreve nós de texto e quebra a reconciliação do React com
      // "Failed to execute 'removeChild' on 'Node'".
      { name: "google", content: "notranslate" },
      { title: "Lendas do Brasileirão — Monte seu time dos sonhos" },
      {
        name: "description",
        content:
          "Draft de jogadores reais da Série A e lendas do futebol brasileiro. Dispute o Brasileirão de pontos corridos, Libertadores, Sul-Americana e Mundial.",
      },
      { property: "og:title", content: "Lendas do Brasileirão — Monte seu time dos sonhos" },
      {
        property: "og:description",
        content:
          "Draft de jogadores reais da Série A e lendas do futebol brasileiro. Dispute o Brasileirão de pontos corridos, Libertadores, Sul-Americana e Mundial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lendas do Brasileirão — Monte seu time dos sonhos" },
      { name: "twitter:description", content: "Draft de jogadores reais da Série A e lendas do futebol brasileiro. Dispute o Brasileirão de pontos corridos, Libertadores, Sul-Americana e Mundial." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3af8bbe-cdd5-4557-9de9-f8ea9fa56555/id-preview-39d62666--7ae0d083-5872-4471-bff2-407f7ee1212b.lovable.app-1784274977168.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3af8bbe-cdd5-4557-9de9-f8ea9fa56555/id-preview-39d62666--7ae0d083-5872-4471-bff2-407f7ee1212b.lovable.app-1784274977168.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" translate="no">
      <head>
        <HeadContent />
      </head>
      <body className="notranslate" translate="no">

        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CrashCatcher>
        <ChatNotifyBootstrap />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </CrashCatcher>
    </QueryClientProvider>
  );
}

function ChatNotifyBootstrap() {
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      initChatNotify(data.session?.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "INITIAL_SESSION") {
        initChatNotify(session?.user?.id ?? null);
      } else if (event === "SIGNED_OUT") {
        stopChatNotify();
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return null;
}


