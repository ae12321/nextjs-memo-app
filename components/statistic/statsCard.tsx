import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = {
  title: string;
  value: number;
};
export default function StatsCard(props: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-8">
              <span>{props.title}</span>
              <span> {props.value}</span>
            </div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
