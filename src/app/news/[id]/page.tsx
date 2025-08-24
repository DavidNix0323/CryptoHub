"use client";
import { useParams } from "next/navigation";
import Placeholder from "../../placeholder";

export default function NewsItem() {
  const { id } = useParams();
  return <Placeholder title={`News Article ${id}`} />;
}
