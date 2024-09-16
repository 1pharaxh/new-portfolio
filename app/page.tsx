import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { WorkCard } from "@/components/work-card";
import { PROJECTS, WORKEXP } from "@/lib/constants";
import { Metadata } from "next";
const BLUR_FADE_DELAY = 0.04;

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
      <section id="work">
        <div className="space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 1}>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Work Experience
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here are some of my professional experiences, showcasing my
                journey and contributions in various roles.
              </p>
            </div>
          </BlurFade>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {WORKEXP.map((work, index) => (
              <BlurFade
                key={work.title + work.dates}
                delay={BLUR_FADE_DELAY * 2 + index * 0.05}
              >
                <WorkCard
                  title={work.title}
                  description={work.description}
                  position={work.position}
                  dates={work.dates}
                  image={work.image}
                  techStack={work.techStack}
                />
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Explore my recent projects
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;ve created a range of projects, from basic websites to
                intricate web applications. Here are some of my top picks.
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mx-auto">
            {PROJECTS.map((project, index) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 4 + index * 0.05}
              >
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
        </div>
      </section>
    </>
  );
}
