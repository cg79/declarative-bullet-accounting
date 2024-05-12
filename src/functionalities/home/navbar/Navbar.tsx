import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { SvgImport } from "../../../_components/svgs/svg-import";
import { useBetween } from "use-between";
import useIdentity from "../../../_store/useIdentity";
import { SvgSalary } from "../../../_components/svgs/svg-salary";

export const Navbar = () => {
  const { loggedUser, deconectare } = useBetween(useIdentity);
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      label: "Acasa",
      icon: "pi pi-fw pi-building",

      command: () => {
        console.log("/");
        navigate("/");
      },
    },
    {
      label: "Start",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Termeni",
          icon: "pi pi-fw pi-external-link",
          command: () => {
            navigate("/termeni");
          },
        },
        {
          label: "Feedback",
          icon: "pi pi-fw pi-external-link",
          command: () => {
            navigate("/feedback");
          },
        },
        {
          label: "Sterge Cont",
          icon: "pi pi-fw pi-trash",
          command: () => {
            navigate("/stergerecont");
          },
          visible: !!loggedUser,
        },
        {
          label: "Lista Banci",
          icon: "pi pi-fw pi-trash",
          command: () => {
            navigate("/banci");
          },
          visible: !!loggedUser,
        },
        {
          label: "Todo",
          icon: "pi pi-fw pi-calculator",
          command: () => {
            navigate("/todo");
          },
          visible: !!loggedUser,
        },
        // {
        //   label: "Lamda",
        //   icon: "pi pi-fw pi-trash",
        //   command: () => {
        //     navigate("/lamda");
        //   },
        //   visible: !!loggedUser,
        // },
      ],
      // visible: !!loggedUser,
    },

    {
      label: "Logare",
      icon: (
        <div className="mr5">
          <SvgSalary></SvgSalary>
        </div>
      ),

      command: () => {
        navigate("/login");
      },
      visible: !!!loggedUser,
    },

    {
      label: "Taxe",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Situatia Initiala",
          icon: "pi pi-fw pi-external-link",
          command: () => {
            navigate("/initial");
          },
        },
        {
          label: "Taxe",
          icon: "pi pi-fw pi-external-link",
          command: () => {
            navigate("/taxe");
          },
        },
      ],
      visible: !!loggedUser,
    },

    {
      label: "Firme",
      icon: "pi pi-fw pi-building",

      command: () => {
        console.log("/angajati");
        navigate("/firme");
      },
      visible: !!loggedUser,
    },
    {
      label: "Angajati",
      icon: "pi pi-fw pi-user",

      command: () => {
        console.log("/angajati");
        navigate("/angajati");
      },
      visible: !!loggedUser,
    },
    {
      label: "Salarii",
      icon: (
        <div className="mr5">
          <SvgSalary></SvgSalary>
        </div>
      ),

      command: () => {
        navigate("/salarii");
      },
      visible: !!loggedUser,
    },

    {
      label: "Tranzactii",
      icon: "pi pi-fw pi-calculator",
      command: () => {
        console.log("Tranzactii");
        navigate("/accounting");
      },
      visible: !!loggedUser,
    },
    {
      label: "Import Extrase",
      // icon: "pi pi-fw pi-power-off",
      icon: (
        <div className="mr5">
          <SvgImport></SvgImport>
        </div>
      ),

      command: () => {
        console.log("Tranzactii");
        navigate("/pdfimport");
      },
      visible: !!loggedUser,
    },
    // {
    //   label: "Contact",
    //   icon: "pi pi-fw pi-calculator",
    //   command: () => {
    //     navigate("/contact");
    //   },
    // },

    {
      label: "Deconectare",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        deconectare();
        navigate("/login");
      },
      visible: !!loggedUser,
    },
  ];

  return (
    <div className="img_bk">
      <Menubar model={items} />
    </div>
  );
};
