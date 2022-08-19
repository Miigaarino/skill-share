import { HorizontalContainer } from "./HorizontalContainer";

const navigation = [
  {
    name: "Mail",
    href: "mailto:myagmarsurenborkhuu@gmail.com",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Miigaarino/",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/miigaarino",
    icon: () => (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Steam",
    href: "https://steamcommunity.com/id/Miigaarino",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="h-6 w-6"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-4.738 0-8.71-3.317-9.735-7.749l3.752 1.578c.244 1.235 1.338 2.182 2.67 2.171 1.477-.014 2.662-1.211 2.672-2.682l.006-.003 3.087-2.301c1.975.021 3.548-1.571 3.548-3.506 0-1.937-1.572-3.508-3.508-3.508-1.915 0-3.47 1.535-3.506 3.441l-2.263 3.166c-.572-.012-1.087.145-1.535.438l-5.123-2.155c.555-4.994 4.797-8.89 9.935-8.89 5.514 0 10 4.486 10 10s-4.486 10-10 10zm-2.753-8.091l-1.322-.555c.249-.094.492-.137.738-.137 1.138 0 2.074.926 2.084 2.065.01 1.153-.912 2.094-2.066 2.104-.867.004-1.602-.513-1.928-1.248l1.324.556c.769.323 1.653-.039 1.977-.807.324-.768-.037-1.654-.807-1.978zm2.861-4.401c0-1.315 1.069-2.384 2.384-2.384s2.384 1.069 2.384 2.384c0 1.314-1.069 2.385-2.384 2.385s-2.384-1.07-2.384-2.385zm2.384 1.801c-.994 0-1.802-.807-1.802-1.8s.808-1.801 1.802-1.801c.993 0 1.8.809 1.8 1.801 0 .992-.807 1.8-1.8 1.8z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-cool-gray duration-300 dark:bg-cool-black">
      <HorizontalContainer>
        <div className="py-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                target="_blank"
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
                rel="noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Miigaarino
            </p>
          </div>
        </div>
      </HorizontalContainer>
    </footer>
  );
}
