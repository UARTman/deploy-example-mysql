import { Task } from "@prisma/client";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { TodoList } from "~/components/TodoList";
import { db } from "~/db";

export async function loader() {
  return json(await db.task.findMany())
}

export async function action({request, context, params}: ActionArgs) {
  if (request.method == "POST" || request.method == "post") {
    const fdata = await request.formData();
    await db.task.create({
      data: {
        done: false,
        title: fdata.get("title")!.toString()
      }
    });
    return redirect("/");
  }
  if (request.method == "PUT" || request.method == "put") {
    const fdata = await request.formData();
    console.log(fdata.get("done")?.toString());
    await db.task.update({
      where: {id: parseInt(fdata.get("id")!.toString())},
      data: {
        title: fdata.get("title")?.toString(),
        done: fdata.get("done")?.toString() == "true",
      }
    });
    return redirect("/")
  }
  if (request.method == "DELETE" || request.method == "delete") {
    const fdata = await request.formData();
    const id = parseInt(fdata.get("id")!.toString());
    await db.task.delete({where: {
      id
    }});
    return redirect("/");
  }
  return redirect("/"); 
}

export default function Index() {
  const ldata: [Task] = useLoaderData();
  const submit = useSubmit();

  const onChange = (id: number, task: Task) => {
    submit({
      id: task.id.toString(),
      done: task.done.toString(),
      title: task.title
    }, {method: "put"});
  }

  const onDelete = (id: number) => {
    submit({id: id.toString()}, {method: "delete"})
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <TodoList todos={ldata} onTaskChange={onChange} onTaskDelete={onDelete}  />
      <Form method="post" > 
        <input name="title"></input>
        <button type="submit">Create task</button>
      </Form>
    </div>
  );
}
