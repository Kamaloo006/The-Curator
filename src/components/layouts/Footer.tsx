import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import classes from "./Modules/Footer.module.css";
import { useThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";

const data = [
  {
    title: "PLATFORM",
    links: [
      { label: "Discover", link: "/" },
      { label: "Latest Posts", link: "/latest" },
      { label: "Featured Authors", link: "/authors" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", link: "/about" },
      { label: "Careers", link: "/careers" },
      { label: "Contact Us", link: "/contact" },
    ],
  },
];

export function Footer() {
  const { theme } = useThemeContext();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={clsx(classes.link, {
          [classes.linkLight]: theme === "light",
          [classes.linkDark]: theme === "dark",
        })}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text
          className={clsx(classes.title, {
            [classes.titleLight]: theme === "light",
            [classes.titleDark]: theme === "dark",
          })}
        >
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer
      className={clsx(classes.footer, {
        [classes.footerLight]: theme === "light",
        [classes.footerDark]: theme === "dark",
      })}
    >
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <h1 className={clsx(classes.description, "flex flex-col gap-1")}>
            <span
              className={clsx(
                "text-2xl font-extrabold uppercase text-[#5866FA]",
              )}
            >
              The Curator
            </span>
            <span
              className={clsx("text-sm", {
                "text-[#868E96]": theme === "light",
                "text-[#A0A0A0]": theme === "dark",
              })}
            >
              A journal of editorial precision. We explore the intersections of
              design, culture, and future tech.
            </span>
          </h1>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text
          c="dimmed"
          size="sm"
          className={clsx({
            "text-[#868E96]": theme === "light",
            "text-[#A0A0A0]": theme === "dark",
          })}
        >
          © {new Date().getFullYear()} Kamal AlKhatib All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            aria-label="Twitter"
            className={clsx(classes.socialIcon, {
              [classes.socialIconLight]: theme === "light",
              [classes.socialIconDark]: theme === "dark",
            })}
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            aria-label="Youtube"
            className={clsx(classes.socialIcon, {
              [classes.socialIconLight]: theme === "light",
              [classes.socialIconDark]: theme === "dark",
            })}
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            aria-label="Instagram"
            className={clsx(classes.socialIcon, {
              [classes.socialIconLight]: theme === "light",
              [classes.socialIconDark]: theme === "dark",
            })}
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
