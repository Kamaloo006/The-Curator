import { Container } from "@mantine/core";
import HeroBackground from "../../assets/heroBackground.png";
import HeroAuthor from "../../assets/HeroAuthor.png";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { useThemeContext } from "../../context/ThemeContext";
import useAOS from "../../hooks/useAos";
import clsx from "clsx";

const Hero = () => {
  const { theme } = useThemeContext();
  useAOS();

  return (
    <Container size={1232} className=" py-22.5 px-4 md:px-8">
      <div
        className={clsx(`flex flex-col-reverse md:flex-row gap-6 items-center`)}
        data-aos="fade-up"
      >
        <div className="w-full md:w-1/2 overflow-hidden rounded-xl">
          <img
            src={HeroBackground}
            loading="lazy"
            alt="Hero"
            className="w-full h-62.5 sm:h-75 md:h-100 lg:h-116.5 object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={HeroAuthor}
              className="w-10 h-10 rounded-full"
              loading="lazy"
            />
            <div>
              <div
                className={clsx("text-sm font-semibold", {
                  "text-[#eee]": theme === "dark",
                })}
              >
                Elena Valerius
              </div>
              <div className="text-xs text-gray-500">Editorial Director</div>
            </div>
          </div>

          <h1
            className={clsx(
              "font-extrabold leading-snug text-3xl sm:text-4xl md:text-5xl lg:text-6xl  xl:w-125.25 text-[#1C1B1B]",
              { "text-[#eee]": theme === "dark" },
            )}
          >
            The Architecture of Quite Spaces
          </h1>

          <p
            className={clsx(
              "mt-4 text-[#454655] text-sm sm:text-base md:text-lg",
              { "text-[#C8C6C5]": theme === "dark" },
            )}
          >
            Exploring how intentional minimalism in physical and digital
            environments reshapes our cognitive focus and creative output in an
            age of noise.
          </p>

          <div
            className={clsx(
              `mt-5 flex flex-wrap gap-4 text-[#454655] text-sm`,
              { "text-[#929090]": theme === "dark" },
            )}
          >
            <span className="flex items-center gap-2">
              <IconCalendar size={18} /> Oct 24, 2023
            </span>
            <span className="flex items-center gap-2">
              <IconClock size={18} /> 12 min read
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
