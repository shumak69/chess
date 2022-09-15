import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

function LostFigures({ title, figures }: LostFiguresProps) {
  return (
    <div className="lost-wrapper">
      <h3>{title}</h3>
      <div className="lost">
        {figures.map((figure) => (
          <div key={figure.id}>
            {figure.name}{" "}
            {figure.logo && <img src={figure.logo} alt={figure.name} width={20} height={20} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LostFigures;
