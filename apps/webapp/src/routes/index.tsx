import { authClient } from '@repo/auth/client';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { ArrowRightLeftIcon, CalendarClockIcon, ChartNoAxesCombinedIcon, ChartPieIcon, ChartSplineIcon, ClipboardListIcon, Clock9Icon, CrownIcon, FacebookIcon, HashIcon, InstagramIcon, LinkedinIcon, SettingsIcon, SquareActivityIcon, TwitterIcon, Undo2Icon, UsersIcon } from 'lucide-react';

import { Separator } from '@repo/ui/components/separator';
import { Card, CardContent } from '@repo/ui/components/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@repo/ui/components/breadcrumb';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@repo/ui/components/sidebar';
import { signOut } from '~/lib/auth-actions';
import { client } from '~/lib/api';
import { ChatInput, ScrollAreaDemo } from '~/components/chat/chat-input';

export const Route = createFileRoute('/')({
  component: ApplicationShell,
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession();
    if (!session) {
      console.log('No active session, redirecting to /login');
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function ApplicationShell() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: '/login' });
  };

  //TODO remove
  const testAuth = async () => {
    const res = await client.api.protected.$get();

    if (res.ok) {
      const data = await res.json();
      console.log('Protected route data:', data);
    }
  };

  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut}>
                      <>
                        <ChartNoAxesCombinedIcon />
                        <span>Sign Out</span>
                      </>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-primary/10 rounded-full">5</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ChartSplineIcon />
                        <span>Content Performance</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <UsersIcon />
                        <span>Audience Insight</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={testAuth}>
                      <a href="#">
                        <ChartPieIcon />
                        <span>Test Auth Metrics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <HashIcon />
                        <span>Hashtag Performance</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-primary/10 rounded-full">3</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ArrowRightLeftIcon />
                        <span>Competitor Analysis</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Clock9Icon />
                        <span>Campaign Tracking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <ClipboardListIcon />
                        <span>Sentiment Tracking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <CrownIcon />
                        <span>Influencer</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Supporting Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <SquareActivityIcon />
                        <span>Real Time Monitoring</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <CalendarClockIcon />
                        <span>Schedule Post & Calendar</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Undo2Icon />
                        <span>Report & Export</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <SettingsIcon />
                        <span>Settings & Integrations</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <UsersIcon />
                        <span>User Management</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:!size-5" />
                <Separator orientation="vertical" className="hidden !h-4 sm:block" />
                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Free</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-1.5">
                {/* <LanguageDropdown
                  trigger={
                    <Button variant="ghost" size="icon">
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ProfileDropdown
                  trigger={
                    <Button variant="ghost" size="icon" className="size-9.5">
                      <Avatar className="size-9.5 rounded-md">
                        <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                /> */}
              </div>
            </div>
          </header>
          <main className="bg-primary mx-auto size-full max-w-7xl flex-1 flex flex-col px-4 py-6 sm:px-6 ">
            <ChatInput />
          </main>
          {/* <main>
            <ChatInput />
          </main> */}
          <footer>
            <div className="text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6">
              <p className="text-sm text-balance max-sm:text-center">
                {`©${new Date().getFullYear()}`}{' '}
                <a href="#" className="text-primary">
                  shadcn/studio
                </a>
                , Made for better web design
              </p>
              <div className="flex items-center gap-5">
                <a href="#">
                  <FacebookIcon className="size-4" />
                </a>
                <a href="#">
                  <InstagramIcon className="size-4" />
                </a>
                <a href="#">
                  <LinkedinIcon className="size-4" />
                </a>
                <a href="#">
                  <TwitterIcon className="size-4" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
}
