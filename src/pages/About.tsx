import { Container, Button } from "@mantine/core";
import clsx from "clsx";
import Navbar from "../components/layouts/Navbar";
import { Footer } from "../components/layouts/Footer";
import { useThemeContext } from "../context/ThemeContext";
import useAOS from "../hooks/useAOS";
import aboutMainImg from "../assets/aboutMainImg.png";
import personOne from "../assets/personOne.png";
import personTwo from "../assets/personTwo.png";
import personThree from "../assets/personThree.png";
import aboutOne from "../assets/aboutOne.png";
import aboutTwo from "../assets/aboutTwo.png";
const team = [
  {
    name: "Amina Rahman",
    role: "Editorial Director",
    image: personTwo,
  },
  {
    name: "Noah Bennett",
    role: "Senior Writer",
    image: personOne,
  },
  {
    name: "Mina Okafor",
    role: "Visual Editor",
    image: personThree,
  },
];

const About = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  useAOS();

  return (
    <div
      className={clsx(
        "min-h-screen",
        isDark
          ? "bg-[#242424] text-[#F5F2EF]"
          : "bg-[linear-gradient(180deg,#FBF8F7_0%,#F6F1EC_48%,#FCFAF9_100%)] text-[#1C1B1B]",
      )}
    >
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div
            className={clsx(
              "absolute inset-0 pointer-events-none",
              isDark
                ? "bg-[radial-gradient(circle_at_top_left,rgba(88,102,250,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]"
                : "bg-[radial-gradient(circle_at_top_left,rgba(88,102,250,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,191,143,0.18),transparent_30%)]",
            )}
          />

          <Container
            size={1232}
            className="relative px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28"
          >
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <p className="text-xs uppercase tracking-[0.35em] text-[#5866FA] font-semibold mb-4">
                About The Curator
              </p>
              <h1
                className={clsx(
                  "text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[0.95]",
                  isDark ? "text-white" : "text-[#1C1B1B]",
                )}
              >
                The art of
                <span className="block text-[#5866FA]">
                  intentional curation.
                </span>
              </h1>
              <p
                className={clsx(
                  "mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-8",
                  isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                )}
              >
                We publish precise, visually rich stories about design, culture,
                and technology. Our work is shaped like an editorial object:
                calm, deliberate, and built to slow people down long enough to
                notice the details.
              </p>
              <div className="mt-8 flex justify-center gap-3 flex-wrap">
                <Button
                  component="a"
                  href="/latest"
                  size="md"
                  radius="md"
                  className="bg-[#5866FA] hover:bg-[#3C4AE0]"
                >
                  Explore Stories
                </Button>
                <Button
                  component="a"
                  href="#collective"
                  variant="outline"
                  size="md"
                  radius="md"
                  color={isDark ? "gray" : "dark"}
                >
                  Meet the collective
                </Button>
              </div>
            </div>

            <div
              className="mt-14 max-w-4xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div
                className={clsx(
                  "overflow-hidden rounded-4xl shadow-[0_25px_80px_rgba(0,0,0,0.12)] border",
                  isDark ? "border-[#353434]" : "border-white",
                )}
              >
                <img
                  src={aboutMainImg}
                  alt="Editorial mood board"
                  className="h-70 sm:h-95 w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-20">
          <Container size={1232} className="px-4 md:px-8">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div data-aos="fade-right">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5866FA] mb-3">
                  Our mission
                </p>
                <h2
                  className={clsx(
                    "text-3xl md:text-5xl font-extrabold leading-tight",
                    isDark ? "text-white" : "text-[#1C1B1B]",
                  )}
                >
                  A digital atrium for thoughtful voices.
                </h2>
                <p
                  className={clsx(
                    "mt-5 text-base md:text-lg leading-8 max-w-2xl",
                    isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                  )}
                >
                  The Curator exists to make the web feel slower, clearer, and
                  more human. We highlight work that values restraint, clarity,
                  and taste over noise. Every story is chosen to be useful,
                  memorable, and visually composed.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div
                    className={clsx(
                      "rounded-2xl p-5 border",
                      isDark
                        ? "bg-[#1C1B1B] border-[#353434]"
                        : "bg-white border-[#E7E2DE]",
                    )}
                  >
                    <div className="text-3xl font-extrabold text-[#5866FA]">
                      12+
                    </div>
                    <div
                      className={clsx(
                        "mt-2 text-sm",
                        isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                      )}
                    >
                      Editorial contributors shaping the voice of the magazine.
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "rounded-2xl p-5 border",
                      isDark
                        ? "bg-[#1C1B1B] border-[#353434]"
                        : "bg-white border-[#E7E2DE]",
                    )}
                  >
                    <div className="text-3xl font-extrabold text-[#5866FA]">
                      48
                    </div>
                    <div
                      className={clsx(
                        "mt-2 text-sm",
                        isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                      )}
                    >
                      Essays, interviews, and features published with care.
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-4"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div
                  className={clsx(
                    "rounded-[1.75rem] overflow-hidden border",
                    isDark
                      ? "border-[#353434] bg-[#1C1B1B]"
                      : "border-[#EFE7E2] bg-white",
                  )}
                >
                  <img
                    src={aboutOne}
                    alt="Studio details"
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-md font-bold text-[#5866FA]">
                      Curated systems
                    </p>
                    <p
                      className={clsx(
                        "mt-2 text-sm leading-6",
                        isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                      )}
                    >
                      Minimal structures that give the writing room to breathe.
                    </p>
                  </div>
                </div>

                <div
                  className={clsx(
                    "rounded-[1.75rem] overflow-hidden border mt-12",
                    isDark
                      ? "border-[#353434] bg-[#1C1B1B]"
                      : "border-[#EFE7E2] bg-white",
                  )}
                >
                  <img
                    src={aboutTwo}
                    alt="Editor portrait"
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-md font-bold text-[#5866FA]">
                      Voice-led publishing
                    </p>
                    <p
                      className={clsx(
                        "mt-2 text-sm leading-6",
                        isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                      )}
                    >
                      We shape each section around perspective, rhythm, and
                      tone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="collective" className="py-12 md:py-20">
          <Container size={1232} className="px-4 md:px-8">
            <div
              className="text-center max-w-2xl mx-auto mb-10"
              data-aos="fade-up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5866FA] mb-3">
                The editorial collective
              </p>
              <h2
                className={clsx(
                  "text-3xl md:text-5xl font-extrabold",
                  isDark ? "text-white" : "text-[#1C1B1B]",
                )}
              >
                People who shape the voice.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 ">
              {team.map((member, index) => (
                <article
                  key={member.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                  className={clsx(
                    "group rounded-[1.75rem] overflow-hidden border cursor-pointer transition-all duration-300 ease-out  hover:shadow-2xl",
                    isDark
                      ? "bg-[#1C1B1B] border-[#353434]"
                      : "bg-white border-[#E7E2DE]",
                  )}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-72 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <div className="p-5">
                    <h3
                      className={clsx(
                        "text-xl font-bold",
                        isDark ? "text-white" : "text-[#1C1B1B]",
                      )}
                    >
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#5866FA] font-semibold">
                      {member.role}
                    </p>
                    <p
                      className={clsx(
                        "mt-3 text-sm leading-6",
                        isDark ? "text-[#B9B6B3]" : "text-[#5D5B66]",
                      )}
                    >
                      Editorial decisions are made through collaboration, not
                      speed. Each contributor helps keep the magazine sharp and
                      coherent.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
