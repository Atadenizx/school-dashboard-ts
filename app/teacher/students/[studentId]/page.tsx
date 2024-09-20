import { createClient } from "@/utils/supabase/client";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import CopyButton from "@/app/_components/CopyButton";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import DeleteTeacherButton from "@/app/_components/teacher/teacherProfile/DeleteTeacherButton";
import Link from "next/link";

export const fetchCache = "force-no-store";

async function getStudentData(studentId: string) {
  const supabase = createClient();
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", studentId)
    .single();

  if (error || !student) {
    return notFound();
  }

  const { data: parent, error: parentErr } = await supabase
    .from("parents")
    .select("*")
    .eq("children", student.id);

  if (parentErr || !parent) {
    return { student, parent: null }; // Return student even if no parent is found
  }

  return { student, parent };
}

export default async function StudentProfilePage({
  params,
}: {
  params: { studentId: string };
}) {
  const { student, parent } = await getStudentData(params.studentId);

  const { id, name, age, email, class: class_name, subject } = student;

  const parent_name_one = parent?.[0]?.name || "Unknown";
  const parent_name_two = parent?.[1]?.name || null;
  const parent_id_one = parent?.[0]?.id || "Unknown";
  const parent_id_two = parent?.[1]?.id || null;

  return (
    <div className="p-4 min-h-screen">
      <Card className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <CardHeader>
            <div className="flex gap-2 align-bottom items-baseline">
              <CardTitle>{name}</CardTitle>
              <div className="">
                <Badge variant="outline">{class_name} Student</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="border-b py-2 space-y-2">
                <h1 className="font-bold">Personal Information:</h1>
                <div>
                  <h2>Name: {name}</h2>
                  <h2>Age: {age}</h2>
                  <h2>Class: {class_name}</h2>
                  <div className="flex flex-wrap align-middle justify-start w-fit items-center gap-2 hover:bg-gray-200 rounded-lg">
                    <h2>Email:</h2>
                    <h2 className="break-all">{email}</h2>
                    <CopyButton copyItem={email} />
                  </div>
                  <div>
                    <h2>
                      <Link href={`/teacher/parents/${parent_id_one}`}>
                        Parent Name: {parent_name_one}
                      </Link>
                    </h2>
                    {parent_name_two && <h2>Parent Name: {parent_name_two}</h2>}
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="p-2">
                  <Button variant="default">
                    <MessageSquareMore />
                  </Button>
                </div>
                <div className="p-2">
                  {/* <EditTeacherDialog teacher={teacher} /> */}
                </div>
                <div className="p-2">
                  <DeleteTeacherButton id={id} name={name} />
                </div>
              </div>
            </div>
          </CardContent>
        </div>
        <div className="col-span-1 mt-6 mr-4 xl:pb-4 lg:flex lg:items-center lg:justify-center">
          <Image
            src="https://via.placeholder.com/500x500?text=Student+Image"
            width={500}
            height={500}
            alt="Student Placeholder Image"
            className="rounded-lg border border-gray-200"
          />
        </div>
      </Card>
    </div>
  );
}
