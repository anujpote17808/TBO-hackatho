import { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Cpu, Database, Layers } from 'lucide-react';
import { ARCHITECTURE_LAYERS, TECH_STACK_GROUPS } from '../data/architectureData';
import { DemoBadge } from '../components/common/DemoBadge';

export function ArchitecturePage() {
  const [selectedStep, setSelectedStep] = useState(5);

  const activeLayer =
    ARCHITECTURE_LAYERS.find((l) => l.step === selectedStep) ?? ARCHITECTURE_LAYERS[0];

  const rows = [
    ARCHITECTURE_LAYERS.slice(0, 3),
    ARCHITECTURE_LAYERS.slice(3, 6),
    ARCHITECTURE_LAYERS.slice(6, 9),
  ];

  return (
    <div className="space-y-5">
      {/* Legend Banner */}
      <div className="bg-[#0B1530] text-white rounded-2xl p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#14B8D4]">
            System Blueprint · Click Any Layer to Inspect
          </span>
          <h2 className="font-display font-extrabold text-xl mt-0.5">
            9-Layer TripMatch AI Inventory Intelligence Architecture
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Transparently separates <strong>Implemented Prototype Capabilities</strong> running live in this dashboard from <strong>Proposed Production Architecture</strong> designed for global multi-supplier scale.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D9B80]/20 border border-[#0D9B80]/40 text-[#4FD1B8] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0D9B80]" aria-hidden="true" />
            Implemented in Prototype
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#14B8D4]" aria-hidden="true" />
            Proposed Production Scale
          </span>
        </div>
      </div>

      {/* Interactive 9-Layer Visual Flow Diagram */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <section
          aria-label="9-layer architecture flow diagram"
          className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 space-y-3"
        >
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                {row.map((layer, colIdx) => {
                  const isSelected = layer.step === activeLayer.step;
                  const isImplemented = layer.status === 'Implemented in Prototype';
                  return (
                    <div key={layer.step} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedStep(layer.step)}
                        className={`flex-1 h-full text-left rounded-xl p-3.5 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B1530] text-white border-[#14B8D4] shadow-md ring-2 ring-[#14B8D4]/30'
                            : 'bg-[#F8FAFC] text-[#182338] border-slate-200 hover:border-[#14B8D4]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isSelected ? 'text-[#14B8D4]' : 'text-[#1677E8]'
                            }`}
                          >
                            Layer 0{layer.step}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              isImplemented
                                ? isSelected
                                  ? 'bg-[#0D9B80] text-white'
                                  : 'bg-[#0D9B80]/15 text-[#0D9B80]'
                                : isSelected
                                ? 'bg-white/15 text-slate-200'
                                : 'bg-slate-200/80 text-slate-600'
                            }`}
                          >
                            {isImplemented ? 'Live Demo' : 'Proposed'}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-sm mt-1.5">
                          {layer.name}
                        </h3>
                        <p
                          className={`text-[11px] mt-1 leading-relaxed ${
                            isSelected ? 'text-slate-300' : 'text-[#7C899D]'
                          }`}
                        >
                          {layer.shortDesc}
                        </p>
                      </button>

                      {colIdx < row.length - 1 && (
                        <ArrowRight
                          className="w-4 h-4 text-[#14B8D4] hidden md:block shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {rowIdx < rows.length - 1 && (
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F6FA] border border-slate-200 text-[10px] font-bold text-[#475569]">
                    <ArrowDown className="w-3.5 h-3.5 text-[#1677E8]" aria-hidden="true" />
                    {rowIdx === 0
                      ? 'Normalized Canonical Stream → Entity & Semantic Intelligence'
                      : 'Reconciled Offers → Selection, Ranking & Unified OS Output'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Right 4 Cols: Selected Layer Deep-Dive */}
        <aside className="xl:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677E8]">
              <Layers className="w-4 h-4" aria-hidden="true" />
              Layer 0{activeLayer.step} Specification
            </span>
            <DemoBadge
              variant={
                activeLayer.status === 'Implemented in Prototype' ? 'teal' : 'light'
              }
              label={activeLayer.status}
            />
          </div>

          <div>
            <h3 className="font-display font-extrabold text-xl text-[#0B1530]">
              {activeLayer.name}
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {activeLayer.details}
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7C899D]">
                Inputs
              </span>
              <p className="text-[#0B1530] font-medium mt-0.5">{activeLayer.inputs}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7C899D]">
                Outputs
              </span>
              <p className="text-[#0B1530] font-medium mt-0.5">{activeLayer.outputs}</p>
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#7C899D] mb-2">
              Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeLayer.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-[#0B1530] text-[#14B8D4] text-[11px] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Technology Stack Matrix */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TECH_STACK_GROUPS.map((group) => (
          <div key={group.category} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="font-display font-bold text-sm text-[#0B1530] flex items-center gap-2">
                {group.category.includes('Backend') ? (
                  <Database className="w-4 h-4 text-[#1677E8]" aria-hidden="true" />
                ) : (
                  <Cpu className="w-4 h-4 text-[#14B8D4]" aria-hidden="true" />
                )}
                {group.category}
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#0D9B80] mb-3">{group.status}</p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8D4] shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

