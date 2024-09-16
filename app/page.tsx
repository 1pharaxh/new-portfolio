import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/constants";
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {PROJECTS.map((project, id) => (
          <BlurFade key={project.title} delay={0.04 * 12 + id * 0.05}>
            <ProjectCard
              href={project.href}
              key={project.title}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
    </>
  );
}
