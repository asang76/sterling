"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Job } from "@/content/jobs";
import { inputClass } from "./FormField";

export function JobBoard({ jobs }: { jobs: Job[] }) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [sector, setSector] = useState("");
  const [contract, setContract] = useState("");

  const results = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (!q || `${j.title} ${j.summary}`.toLowerCase().includes(q.toLowerCase())) &&
          (!loc || j.location.toLowerCase().includes(loc.toLowerCase())) &&
          (!sector || j.sector === sector) &&
          (!contract || j.contract === contract),
      ),
    [jobs, q, loc, sector, contract],
  );

  const filtering = !!(q || loc || sector || contract);

  return (
    <div>
      <form role="search" aria-label="Search jobs" onSubmit={(e) => e.preventDefault()} className="flex flex-wrap items-end gap-3.5 rounded-xl bg-white p-5 text-slate">
        <label className="flex min-w-[200px] flex-[2_1_200px] flex-col gap-1.5 text-[15px] font-semibold text-navy">
          Job title or keyword
          <input value={q} onChange={(e) => setQ(e.target.value)} type="text" className={inputClass()} />
        </label>
        <label className="flex min-w-[180px] flex-[2_1_180px] flex-col gap-1.5 text-[15px] font-semibold text-navy">
          Town or postcode
          <input value={loc} onChange={(e) => setLoc(e.target.value)} type="text" className={inputClass()} />
        </label>
        <label className="flex min-w-[150px] flex-[1_1_150px] flex-col gap-1.5 text-[15px] font-semibold text-navy">
          Sector
          <select value={sector} onChange={(e) => setSector(e.target.value)} className={inputClass()}>
            <option value="">Any</option>
            <option>Driving</option>
            <option>Care</option>
            <option>Support work</option>
          </select>
        </label>
        <label className="flex min-w-[150px] flex-[1_1_150px] flex-col gap-1.5 text-[15px] font-semibold text-navy">
          Contract
          <select value={contract} onChange={(e) => setContract(e.target.value)} className={inputClass()}>
            <option value="">Any</option>
            <option>Temporary</option>
            <option>Permanent</option>
          </select>
        </label>
        <button type="button" onClick={() => { setQ(""); setLoc(""); setSector(""); setContract(""); }} className="h-12 rounded-md border-2 border-accent bg-white px-5 text-base font-semibold text-accent">
          Reset
        </button>
      </form>

      <p role="status" className="my-5 text-base">
        {results.length === 0 ? (filtering ? "No roles match your search." : "No open roles right now.") : `${results.length} role${results.length === 1 ? "" : "s"} found.`}
      </p>

      {results.length === 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-border bg-white p-8">
          <div className="min-w-0 flex-[1_1_380px]">
            <h3 className="mb-2 text-[22px] font-semibold text-navy">No open roles listed right now</h3>
            <p className="m-0 text-[17px] leading-relaxed">We only show real, current vacancies. Register your details and we’ll be in touch when a suitable role comes up.</p>
          </div>
          <Link href="#register" className="rounded-md bg-accent px-6 py-3.5 text-[17px] font-semibold text-white no-underline hover:brightness-110 hover:text-white">Register for work</Link>
        </div>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
          {results.map((j) => (
            <li key={j.slug} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-white px-6 py-5">
              <div className="min-w-0 flex-[1_1_340px]">
                <h3 className="mb-2 text-[22px] font-semibold text-navy">
                  {j.title}
                  {j.sample ? <span className="ml-3 rounded bg-confirm-bg px-2 py-0.5 align-middle text-xs font-semibold text-confirm-text">Sample role</span> : null}
                </h3>
                <p className="m-0 flex flex-wrap gap-x-5 gap-y-1 text-base">
                  <span>{j.location}</span><span>{j.contract}</span><span>{j.sector}</span>
                  {j.licence ? <span>{j.licence}</span> : null}{j.pay ? <span>{j.pay}</span> : null}
                </p>
                <p className="mt-2 text-[15px]">{j.summary}</p>
              </div>
              <Link href="#register" className="rounded-md bg-accent px-5 py-3 text-base font-semibold text-white no-underline hover:text-white">Apply</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
