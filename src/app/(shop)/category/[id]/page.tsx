import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  if (id === "kids") {
    notFound();
  }

  return <div>CategoryPage</div>;
}
