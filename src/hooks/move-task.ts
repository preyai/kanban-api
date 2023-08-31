// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import { Tasks } from '../client';
import type { HookContext } from '../declarations'

export const moveTask = async (context: HookContext) => {
  // console.log(`Running hook moveTask on ${context.path}.${context.method}`)
  const data = context.data

  if (data.order !== undefined && data.list !== undefined) {
    const tasks = await context.app.service('tasks').find({
      query: {
        _id: { $ne: context.id },
        list: data.list,
        $sort: { order: 1 },
      },
    })
    let n = 0
    for (const task of tasks.data) {
      const order = n === data.order ? ++n : n
      await context.app.service('tasks').patch(task._id.toString(), {
        order,
      })
      n++
    }

    // if (tasks.data.length > 0) {
    //   console.log(tasks.data[0].list);

    //   const id = tasks.data[0]._id.toString()
    //   await context.app.service('tasks').patch(id, {
    //     order: tasks.data[0].order + 1,
    //     list: tasks.data[0].list.toString()
    //   })
    // }
  }

}
