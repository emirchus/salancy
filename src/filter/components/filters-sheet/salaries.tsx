"use client";

import type {Salary} from "@/salary/types";
import {Label} from "@/components/ui/label";
import {useFilters} from "@/filter/hooks/use-filters";

import {SelectFilter} from "./select-filter";

export default function Filters({
  positions,
  currencies,
  seniorities,
}: {
  positions: Salary["position"][];
  currencies: Salary["currency"][];
  seniorities: Salary["seniority"][];
}) {
  const [filters, setFilter] = useFilters();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Label htmlFor="position">Posición</Label>
        <SelectFilter
          id="position"
          options={positions.map((position) => ({
            value: position,
            label: position,
          }))}
          placeholder="Seleccionar las posiciones"
          searchPlaceholder="Buscar posición"
          value={filters.position}
          onChangeAction={(value) => setFilter("position", value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="currency">Moneda</Label>
        <SelectFilter
          id="currency"
          options={currencies.map((currency) => ({
            value: currency,
            label: currency,
          }))}
          placeholder="Seleccionar las monedas"
          searchPlaceholder="Buscar moneda"
          value={filters.currency}
          onChangeAction={(value) => setFilter("currency", value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="seniority">Seniority</Label>
        <SelectFilter
          id="seniority"
          options={seniorities.map((value) => ({
            label: value,
            value,
          }))}
          placeholder="Seleccionar los seniorities"
          searchPlaceholder="Buscar seniority"
          value={filters.seniority}
          onChangeAction={(value) => setFilter("seniority", value)}
        />
      </div>
    </div>
  );
}
