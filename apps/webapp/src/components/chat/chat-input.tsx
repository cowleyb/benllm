'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { Textarea } from '~/components/textarea';
import TextareaAutosize from 'react-textarea-autosize';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Separator } from '~/components/separator';

/* -----------------------------
   MAIN CHAT INPUT TEMPLATE
------------------------------ */

export const ChatInput = ({ showGreeting = true }: { showGreeting?: boolean }) => {
  const threadId = null;
  const size = threadId ? 'base' : 'sm';

  return (
    <div className={clsx('bg-secondary w-full mt-auto')}>
      <div className={clsx('mx-auto flex w-full max-w-3xl flex-col items-start', size === 'sm' && 'px-8')}>
        <div className="flex w-full flex-col items-start pb-4">
          <ChatInputBox />
        </div>
      </div>
    </div>
  );
};

/* -----------------------------
   CHAT INPUT BOX
------------------------------ */
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
const ChatInputBox = () => {
  return (
    <AnimatePresence>
      <motion.div className="w-full px-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
        <div className="relative z-10 w-full rounded-xl border border-border bg-background shadow-sm">
          {/* textarea wrapper – fixed height, scrolls inside */}
          <ScrollArea className="h-60 w-full rounded-lg ">
            <Textarea
              placeholder="Type your message here."
              className="
      full-size
      resize-none

    " /* let the textarea fill the viewport */
            />
          </ScrollArea>
        </div>
      </motion.div>
      <ScrollAreaDemo />
    </AnimatePresence>
  );
};

/* -----------------------------
   PLACEHOLDER BUTTON
------------------------------ */

const PlaceholderButton = ({ label }: { label: string }) => {
  return <button className="rounded-md border px-3 py-1 text-sm text-muted-foreground hover:bg-muted">{label}</button>;
};

/* -----------------------------
   GREETING ANIMATION
------------------------------ */

const AnimatedGreeting = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Good morning';
      if (hour >= 12 && hour < 18) return 'Good afternoon';
      return 'Good evening';
    };

    setGreeting(getGreeting());

    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1 key={greeting} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="bg-gradient-to-r from-muted-foreground/50 via-muted-foreground/40 to-muted-foreground/20 bg-clip-text text-center text-[32px] font-semibold tracking-tight text-transparent">
          {greeting}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};
