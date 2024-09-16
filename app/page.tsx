import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: "/api/og?title=Home",
        width: 1920,
        height: 1080,
        alt: "Home",
      },
    ],
  },
};
export default function Home() {
  return (
    <>
      {Array.from({ length: 50 }, (_, index) => (
        <p key={index} className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada. Nulla facilisi. In sit amet massa at nulla placerat
          tincidunt. Vivamus at felis vestibulum, facilisis erat ut, vehicula
          nulla. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Integer auctor, libero vel dapibus
          feugiat, nunc risus bibendum massa, ac placerat dolor turpis ut eros.
          Nulla consectetur orci eget magna varius, sed luctus lacus interdum.
          Aliquam vel feugiat quam.
        </p>
      ))}
    </>
  );
}
