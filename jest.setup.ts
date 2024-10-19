//import { getMonthlyEvents } from './app/services/eventsService'; // Ajusta la ruta según tu estructura

// jest.mock("./app/services/eventsService", () => ({
//   getMonthlyEvents: jest.fn(() => {
//     let cancel: () => void;
//     const request = new Promise((resolve, reject) => {
//       cancel = () => {
//         reject();
//         console.log("cancel");
//       };
//     });
//     return {
//       cancel,
//       request,
//     };
//   }),
// }));
