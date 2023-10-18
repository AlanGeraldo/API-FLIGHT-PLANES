import { envs } from "./config/enviroments/enviroments.js";
import app from "./app.js";
import { authenticate, syncUp } from "./config/database/database.js";
import { initModel } from "./config/database/association.js";

async function main() {
  try {
    await authenticate();
    initModel();
    await syncUp();
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log("server running on port 3000");
});
