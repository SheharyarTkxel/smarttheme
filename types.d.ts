import { ReactNode } from "react";

declare global {
  interface Children {
    children?: ReactNode;
  }
}
