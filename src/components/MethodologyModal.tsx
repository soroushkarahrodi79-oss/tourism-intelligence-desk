import React from 'react';
import { X, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto text-zinc-100">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded bg-zinc-800 border border-zinc-700 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100">
                Scientific Integrity & Epistemic Charter
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Methodological Standards for Tourism Decision Support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-y-auto max-h-[75vh]">
          {/* Core Philosophy */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 mb-2">
              1. The 8-Part Epistemic Reasoning Structure
            </h4>
            <p className="text-zinc-300">
              The Tourism Intelligence Desk is designed for destination management organisations (DMOs), sustainability directors, tourism analysts, and researchers. It enforces a strict 8-part sequence for every analytical output:
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">1. Observed Signal</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">2. Supporting Evidence</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">3. Interpretation</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-amber-300">4. Evidence Limit</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">5. Competing Explanations</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">6. Evidence Confidence</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-emerald-300">7. Decision Implication</div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">8. Data Needed Next</div>
            </div>
          </div>

          {/* Strict Separation of Data Status & Confidence */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 mb-2">
              2. Strict Distinction: Data Status vs. Evidence Confidence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-zinc-200 font-mono block mb-1">DATA STATUS (The Nature of the Input):</span>
                <ul className="space-y-1 text-zinc-400">
                  <li><strong>Demonstration:</strong> Illustrative values used to test the analytical pipeline.</li>
                  <li><strong>Proxy:</strong> Indirect evidence that is not equivalent to direct observation.</li>
                  <li><strong>Model-derived:</strong> Output computed by an explicit model; not automatically observed or field validated.</li>
                  <li><strong>Reproduced:</strong> A committed analysis chain was independently re-executed and matched its locked references.</li>
                  <li><strong>Observed:</strong> Directly observed or measured data from a documented source.</li>
                  <li><strong>Validated:</strong> Evidence that has passed a stated validation threshold for the specific claim.</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-zinc-200 font-mono block mb-1">EVIDENCE CONFIDENCE (Support for This Claim):</span>
                <ul className="space-y-1 text-zinc-400">
                  <li><strong>Low:</strong> The specific claim is weakly supported or substantially confounded.</li>
                  <li><strong>Moderate:</strong> The claim has meaningful support but important uncertainty or evidence gaps remain.</li>
                  <li><strong>High:</strong> The specific bounded claim is strongly supported by the available evidence; this does not upgrade the underlying data to a different status.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Anti-Causality Rule */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-200 font-mono font-semibold text-xs uppercase mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>3. Anti-Causality Rule: Never Convert Correlation into Causation</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Environmental signals frequently co-occur with tourism without tourism being the causal mechanism.
            </p>
            <div className="mt-2 text-xs space-y-1.5 text-zinc-400">
              <div className="flex items-start gap-2">
                <span className="text-zinc-300 font-bold">•</span>
                <span>
                  <strong>NDVI Vegetation Depletion:</strong> Must NOT automatically be interpreted as tourist trampling. The system systematically audits competing hypotheses including meteorological drought, extreme temperatures, phenology, wildfire, forestry/grazing management, and sensor/cloud shadow effects.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-zinc-300 font-bold">•</span>
                <span>
                  <strong>Urban Heat Island (UHI):</strong> Co-location of pedestrian crowds in mineral plazas does not establish pedestrian body heat as the source of the anomaly. Solar irradiance and thermal inertia of granite dominate metabolic flux by orders of magnitude.
                </span>
              </div>
            </div>
          </div>

          {/* Insufficient Evidence Mandate */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 mb-1.5">
              4. The "INSUFFICIENT EVIDENCE" Mandate
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              When empirical data is insufficient, uncalibrated, or confounded, the system explicitly returns:
            </p>
            <div className="mt-2 p-2.5 rounded bg-zinc-950 border border-zinc-800 font-mono text-xs text-amber-300">
              "INSUFFICIENT EVIDENCE — Available evidence does not establish causation"
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              The system refuses to force an unjustified recommendation or invent a conclusion.
            </p>
          </div>

          {/* Project Attribution */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
            <div>
              <span>Research Project Repository: </span>
              <a
                href="https://github.com/soroushkarahrodi79-oss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white inline-flex items-center gap-1 underline"
              >
                <span>github.com/soroushkarahrodi79-oss</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-zinc-400">Tourism Intelligence Desk</div>
          </div>
        </div>
      </div>
    </div>
  );
};
