<div>
    <div class="container">
        <div class="row ">
            <div class="col">
                <div class="card mt-5 sticky-top " style="width: 20rem;">

                    <h2 class="text-center mb-3">añade tarea</h2>
                    <form @submit.prevent="sendtask">
                        <input class="form-control" type="text" placeholder="titulo" v-model="task.tittle">
                        <textarea class="mt-3" placeholder="descripcion" cols="26" rows="5"
                            v-model="task.description"></textarea>
                        <template v-if="edit === false">
                            <button class="btn btn-success mt-3 col col-s5">enviar</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-warning mt-3 col col-s5">actualizar</button>
                        </template>
                    </form>
                </div>
            </div>
        </div>
        <div class="col">

            <table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">titulo</th>
                        <th scope="col">descripcion</th>
                        <th scope="col">opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tasks" :key="index">
                        <th scope="row"> {{index}} </th>
                        <td> {{item.tittle }} </td>
                        <td> {{item.description}} </td>
                        <td> <button type="button" class="btn btn-danger"
                                @click="deletetask(item._id)">ELIMINAR</button>
                            <button type="button" class="btn btn-warning" @click="edittask(item._id) "> EDITAR
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
</template>

<script>
    class Task {
        constructor(tittle, description) {
            this.tittle = tittle;
            this.description = description;
        }
    }

    export default {
        data() {
            return {
                task: new Task(),
                tasks: [],
                edit: false,
                edittotask: ''
            }
        },
        created() {
            this.gettask()
        },
        methods: {
            sendtask() {
                if (this.edit === false) {
                    fetch('/api/tasks', {
                            method: 'POST',
                            body: JSON.stringify(this.task),
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            this.gettask();
                        })

                } else {
                    console.log(this.edittotask);
                    fetch('/api/tasks/' + this.edittotask, {
                            method: 'PUT',
                            body: JSON.stringify(this.task),
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            this.gettask();
                            // this.edittotask = data._id
                            this.edit = false
                        })
                }
                this.task = new Task()
            },
            gettask() {
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data;
                    })
            },
            deletetask(id) {
                fetch('/api/tasks/' + id, {
                        method: 'DELETE',
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.gettask();
                    });

            },
            edittask(id) {
                fetch('/api/tasks/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.tittle, data.description)
                        this.edittotask = data._id
                        this.edit = true
                    })
            }
        },
    }
</script>