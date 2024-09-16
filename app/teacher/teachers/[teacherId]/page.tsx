import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function TeacherProfilePage({
  params,
}: {
  params: { teacherId: string };
}) {
  const supabase = createClient();
  const { data: teacher, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("id", params.teacherId)
    .single();

  const {
    name,
    age,
    email,
    subject,
    grades,
    teaching_hours: teachingHours,
  } = teacher;

  if (error || !teacher) {
    notFound();
  }

  return (
    <div className="p-4">
      <Card className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <CardHeader>
            <div className="flex gap-2 align-bottom">
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                <Badge variant="outline">{subject} Teacher</Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="border-b py-2 space-y-2">
                <h1 className="font-bold">Personal Information:</h1>
                <div>
                  <h2>Name: {name}</h2>
                  <h2>Age: {age}</h2>
                </div>
              </div>
              <div className="border-b py-2 space-y-2">
                <h1 className="font-bold">Teaching:</h1>
                <div>
                  <h2>Subject: {subject}</h2>
                  <h2>Grades: {grades}</h2>
                  <h2>Teaching Hours: {teachingHours}</h2>
                  <h2>Email: {email}</h2>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <Image
            src="https://via.placeholder.com/500x500?text=Teacher+Image"
            width={500}
            height={500}
            alt="Teacher Placeholder Image"
            className="rounded-lg border border-gray-200"
          />
        </div>
      </Card>
    </div>
  );
}
