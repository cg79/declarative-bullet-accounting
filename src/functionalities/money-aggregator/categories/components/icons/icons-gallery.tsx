import IconGallery from "./icon-gallery";
import TreeIcon from "./tree-icon";

const IconsGallery = ({
  onIconChoosed,
}: {
  onIconChoosed: (icon: string) => void;
}) => {
  const iconList = [
    "pi pi-home",
    "pi pi-calendar",
    "pi pi-search",
    "pi pi-user",
    "pi pi-users",
    "pi pi-shopping-cart",
    "pi pi-cog",
    "pi pi-bell",
    "pi pi-heart",
    "pi pi-envelope",
    "pi pi-comments",
    "pi pi-chart-line",
    "pi pi-exclamation-triangle",
    "pi pi-check-circle",
    "pi pi-times-circle",
    "pi pi-info-circle",
    "pi pi-external-link",
    "pi pi-lock",
    "pi pi-key",
    "pi pi-pencil",
    "pi pi-trash",
    "pi pi-save",
    "pi pi-file",
    "pi pi-folder",
    "pi pi-download",
    "pi pi-upload",
    "pi pi-print",
    "pi pi-refresh",
    "pi pi-power-off",
    "pi pi-eye",
    "pi pi-cloud",
    "pi pi-wifi",
    "pi pi-map",
    "pi pi-compass",
    "pi pi-globe",
    "pi pi-mobile",
    "pi pi-tablet",
    "pi pi-laptop",
    "pi pi-desktop",
    "pi pi-camera",
    "pi pi-video",
    "pi pi-microphone",
    "pi pi-volume-up",
    "pi pi-volume-off",
    "pi pi-check",
    "pi pi-times",
    "pi pi-plus",
    "pi pi-minus",
    "pi pi-angle-up",
    "pi pi-angle-down",
    "pi pi-angle-left",
    "pi pi-angle-right",
    // Add more icons as needed
  ];

  return (
    <div className="fcenter fwrap">
      {iconList.map((icon, index) => (
        <IconGallery
          key={index}
          icon={icon}
          onClick={() => {
            onIconChoosed(icon);
          }}
        />
        // <div key={index} className="icon-item">
        //   <i className={icon} style={{ fontSize: "2em", margin: "10px" }}></i>
        //   <p>{icon}</p>
        // </div>
      ))}
    </div>
  );
};
export default IconsGallery;
