import { Timeline } from "primereact/timeline";
import { SvgCompany } from "../../_components/svgs/svg-company";

const StepperPresentation = () => {
  const events = [
    {
      status: "1. Creare Firma",
      //   date: "15/10/2020 10:30",
      icon: <SvgCompany />,
      color: "#9C27B0",
      //   image: "game-controller.jpg",
    },
    {
      status: "2. Adaugare angajat firmei selectate",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
    },
    {
      status: "3. Seteaza sau importa salariile angajatului",
      date: "15/10/2020 16:15",
      icon: "pi pi-shopping-cart",
      color: "#FF9800",
    },
    {
      status:
        "4. Seteaza sau importa taxele firmei (valabile la nivel de tara)",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },

    {
      status: "5. Importa extrase folosind fisierul de extrase de la banca",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },

    {
      status:
        "6. In sectiunea Tranzactii, se pot vizualiza tranzactiile importate",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },
  ];

  return (
    <div className="card">
      <Timeline
        value={events}
        content={(item) => item.status}
        // marker={customizedMarker}
      />
    </div>
  );
};

export default StepperPresentation;
