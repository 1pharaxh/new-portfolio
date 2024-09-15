import * as React from "react";

type Props = {
  keyCombination: string;
};

export function useCtrlKey({ keyCombination }: Props): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === keyCombination && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [keyCombination]);

  return [open, setOpen];
}