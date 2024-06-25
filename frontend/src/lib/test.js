import { getDistance } from "./utils.js";

const d = getDistance(
  "23.411819,85.323761",
  "23.387940,85.232360",
  "AIzaSyA0GOdzPyWq9sIOPTlT_fwng8wzDSOBSOw"
)
  .then((result) => {
    console.log(`Distance: ${result.distance}, Duration: ${result.duration}`);
  })
  .catch((error) => {
    console.error(error);
  });
console.log(d);