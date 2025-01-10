import AppConfig from "@/config/AppConfig";
import { clientEnv } from "@/env";
import { prisma } from "@/lib/db";
import { maskUser } from "@/modules/user";

import { pageRouter } from "./router";

pageRouter.get("/privacy", async (_req, res) => {
  const user = res.locals["user"]
    ? await prisma.user.findUnique({
        where: { id: res.locals["user"].id },
        include: {
          activeWorkspace: true,
        },
      })
    : null;
  // console.log(`user :>>`, user);

  return res.render("master", {
    page: "pages/privacy",
    site_name: AppConfig.siteName,
    page_name: "Privacy Policy",
    path_name: "/privacy",
    clientEnv,
    user: user ? maskUser(user) : null,
  });
});
