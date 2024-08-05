import { Card, CardContent } from "@/components/ui/card";
import ThemeContext, {
  IThemeContext,
} from "@/infrastructures/context/theme/theme.context";
import React, { useContext } from "react";

function FormWrapper({
  children,
  number,
  title,
}: {
  children: React.ReactNode;
  number: number;
  title: string;
}) {
  const { data: theme } = useContext(ThemeContext) as IThemeContext;

  return (
    <Card className="w-full my-2">
      <CardContent>
        <div className="flex gap-2 items-center mt-3 mb-4">
          <div
            className={`bg-[${theme.primary}] p-2 w-7 h-7 flex justify-center items-center rounded-full`}
          >
            <h6 className="font-bold rounded-full text-white">{number}</h6>
          </div>
          <h6 className={`font-medium ml-1 text-[${theme.primary}]`}>
            {title}
          </h6>
        </div>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
}

export default FormWrapper;
