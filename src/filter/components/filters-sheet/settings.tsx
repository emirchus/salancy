"use client";

import {useCallback, useRef} from "react";

import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {useFilters} from "@/filter/hooks/use-filters";

export default function Settings({inflation}: {inflation: number}) {
  const [filters, setFilter] = useFilters();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedSetFilter = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setFilter("trustTo", value);
      }, 300);
    },
    [setFilter],
  );

  const filtersTo = filters.trustTo ?? 3;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label className="flex w-full items-center gap-2" htmlFor="simulate">
          <Checkbox
            aria-label="Simular salarios actualizados"
            defaultChecked={filters.simulate}
            id="simulate"
            onCheckedChange={(checked) => setFilter("simulate", checked ? "true" : "")}
          />
          Simular salarios actualizados
        </Label>
        <small className="leading-tight text-muted-foreground">
          Simulamos los valores usando la inflación desde cuando la gente subió su salario (
          {inflation}%).
        </small>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="flex w-full items-center gap-2" htmlFor="trusted">
          <Checkbox
            aria-label="Ocultar salarios con pocos reportes"
            defaultChecked={filters.trusted}
            id="trusted"
            onCheckedChange={(checked) => setFilter("trusted", checked ? "true" : "")}
          />
          Ocultar salarios con pocos reportes
        </Label>
        <small className="leading-tight text-muted-foreground">
          Se ocultarán los salarios con menos de {filtersTo >= 100 ? "+100" : filtersTo} reportes.
        </small>

        <Slider
          aria-label="Rango de confianza"
          className="mt-2 data-[disabled]:opacity-30 [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"
          defaultValue={[filtersTo]}
          disabled={!filters.trusted}
          max={100}
          min={1}
          onValueChange={(value) => debouncedSetFilter(value[0].toString())}
        />
      </div>
    </div>
  );
}
