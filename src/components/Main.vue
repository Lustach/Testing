<template>
  <div class="background">
    <div class="form">
      <h2 style="padding:2%">To-do { {{ todo.length }} }</h2>
      <div class=" ">
        <input
          class="Input"
          type="text"
          placeholder="New Task"
          name="timeTask"
          v-model="timeTask"
        />
        <div class="toAdd">
          <v-btn
            color="primary"
            @click="pushNewTask(timeTask)"
          >Add</v-btn>
        </div>
        <div class="grpBtn">
          <v-btn
            class="ma-2"
            color="primary"
            @click="ClearAll"
          >Clear all</v-btn>
          <!-- <v-btn class="primary">Clear Completed</v-btn> -->
        </div>
      </div>
      <div
        v-for="(items, i) in todo"
        :key="i"
      >
        <!-- :value="items.taskname"
        :class="getforcomplete ? lineThrough : lineNone"-->
        <input
          v-if="items.completed"
          class="Input"
          :disabled="edit[i]"
          v-model="items.taskname"
          :style="lineThrough"
        />
        <input
          v-if="items.completed==false"
          class="Input"
          :disabled="edit[i]"
          v-model="items.taskname"
          :style="lineNone"
        />

        <!--style="text-decoration:line-through"-->
        <v-btn
          class="error ErBtn"
          @click="DeleteInp(i)"
        >Delete</v-btn>
        <v-btn
          v-if="edit[i]"
          class="primary"
          @click="EditBtn(i)"
        >
          Edit
        </v-btn>
        <v-btn
          v-else
          class="primary"
          @click="Save(items.taskname)"
        >
          Save
        </v-btn>

        <v-btn
          small
          class="primary done"
          @click="completeTodo(i)"
        >
          <i class="material-icons">
            done
          </i>
        </v-btn>
      </div>
      <!-- 
      <div class="my-1">
        <v-btn color="primary">Добавить</v-btn>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      editindex: 0,
      edit: [true, true, true],
      lineNone: "text-decoration:none",
      lineThrough: "text-decoration:line-through;background-color:grey",
      colorg: "",
      propInp: "1",
      disabledf: true,
      forEdit: false,
      timeTask: "",
      height: "100",
      drawer: null,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  },
  methods: {
    ...mapMutations([
      "ShowPage",
      // "pushNewTask",
      "DeleteInp",
      "ClearAll",
      "EditBtn",
      "completeTodo",
      "Save"
    ]),
    Save(text) {
      this.edit[this.editindex] = true;
      this.$store.commit("Save", {
        id: this.editindex,
        taskname:text
      });
      this.editindex = 0;
    },
    SetStyle(arg) {},
    ...mapActions(["pushNewTask"]),
    EditBtn(arg) {
      this.edit[arg] = false;
      this.editindex = arg;
    },
    pushNewTask(arg) {
      console.log(arg);
      this.$store.commit("pushNewTask", arg);
      this.edit.push(true);
    },
    completeTodo(arg) {
      console.log("In complete arg", arg);
      this.$store.commit("completeTodo", arg);
    },
    DeleteInp(arg) {
      this.$store.commit("DeleteInp", arg);
    },
    ClearAll(arg) {
      this.$store.commit("ClearAll", arg);
    }
  },
  computed: {
    ...mapGetters(["todo", "showpager", "getforcomplete", "getGlobalIndex"])
  }
};
</script>
<style scoped>
.background {
  background-color: rgba(20, 20, 13, 0.548);
  width: 100%;
  height: 100%;
}
.form {
  background-color: rgb(250, 250, 250);
  width: 50%;

  margin-left: 30%;
  margin-top: 10%;
}
.Input {
  border: 1px solid rgb(241, 195, 68);
  margin-left: 5%;
  width: 60%;
  margin-top: 1%;
  padding: 1%;
}
.toAdd {
  margin-left: 66%;
  margin-top: -4.5%;
}
.grpBtn {
  margin: 1% 5% 0%;
}
.ErBtn {
  margin-left: 1%;
}
.done {
  margin-top: -7%;
  margin-left: 83%;
}
.lineThrough {
  text-decoration: line-through;
}
.lineNone {
  text-decoration: none;
}
</style>
