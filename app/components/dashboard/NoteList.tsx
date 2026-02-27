"use client";

import React from "react";
import NoteCard from "./NoteCard";

const NoteList = () => {
  const notes = [
    {
      title: "Grocery list / Stores",
      excerpt:
        "Bread Flour - Instant Dry Yeast - Extra-virgin Olive Oil, 5 banana shallots - 4 garlic cloves",
      time: "1 min",
      location: "San Francisco, CA",
      hasCircle: true,
    },
    {
      title: "Books to read 🌶️",
      excerpt:
        "Cheers to the books we've been meaning to read all these years and should probably start at some point. Lorem ipsum dolor sit amet consectetur.",
      time: "5 min",
      hasCircle: true,
    },
    {
      title: "Write down your ideas 💡",
      excerpt:
        "#ideas #to-do's #morning \"Sometimes, on Mondays, when servers at A16 are ...",
      time: "1 day",
      location: "",
      active: true,
    },
    {
      title: "Curried Carrot Soup",
      excerpt:
        "#recipes/savory #recipes/soups #recipes/savorymains Curried Carrot and Fennel Soup with Turmeric and Ora ...",
      time: "2 days",
      location: "",
    },
    {
      title: "Mexican Tomatillo Scrambled Eggs 🌶️",
      excerpt:
        "#recipes #recipes/savory Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      time: "3 days",
      location: "",
    },
  ];

  return (
    <div className="w-96 min-h-screen bg-secondary border-r border-border p-6 flex flex-col font-dm-sans transition-colors">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Notes
        </h2>
        <div className="w-6 h-6 rounded-full border-2 border-amber-400/30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
        {notes.map((note, idx) => (
          <NoteCard key={idx} {...note} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
