


// import { Request, Response, NextFunction } from "express";

// export const checkRole = (requiredRole: string) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.user?.id;
//     const role = req.user?.role;
//     if (!userId) {
//        res.status(401).json({ message: "Unauthorized: Missing user" });
//        return;
//     }

//     if(role !== requiredRole){
//        res.status(403).json({ message: "Forbidden: Insufficient permissions" });
//        return;
//     }

//     next();
//   };
// };



import { Request, Response, NextFunction } from "express";

export const checkRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId) {
       res.status(401).json({ message: "Unauthorized: Missing user" });
       return;
    }

    if (role && !allowedRoles.includes(role)) {
       res.status(403).json({ message: "Forbidden: Insufficient permissions" });
       return;
    }

    next();
  };
};
