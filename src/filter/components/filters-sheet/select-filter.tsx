"use client";

import {Check, ChevronDown} from "lucide-react";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  onChangeAction: (value: string) => void;
  value: string;
  placeholder?: string;
  searchPlaceholder?: string;
  id?: string;
}

export function SelectFilter({
  options,
  onChangeAction,
  placeholder,
  value,
  searchPlaceholder,
  id,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          id={id}
          role="combobox"
          variant="outline"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ? options.find((option) => option.value === value)?.label : placeholder ?? ""}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="shrink-0 text-muted-foreground/80"
            size={16}
            strokeWidth={2}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=" "
                onSelect={() => {
                  onChangeAction("");
                  setOpen(false);
                }}
              >
                Todas
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChangeAction(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  {value === option.value && (
                    <Check className="ml-auto" size={16} strokeWidth={2} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
