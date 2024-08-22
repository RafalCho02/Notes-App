const $addBtn = $("#add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

$addBtn.on("click", () => addNewNote());

function addNewNote(text = "") {
  const $note = $(`
    <div class="note">
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
  `);

  const $editBtn = $note.find(".edit");
  const $deleteBtn = $note.find(".delete");
  const $main = $note.find(".main");
  const $textArea = $note.find("textarea");

  $textArea.val(text);
  $main.html(marked(text));

  $deleteBtn.on("click", () => {
    $note.fadeOut(300, () => {
      $note.remove();
      updateLS();
    });
  });

  $editBtn.on("click", () => {
    $main.toggleClass("hidden");
    $textArea.toggleClass("hidden");
    $textArea.focus();
  });

  $textArea.on("input", (e) => {
    const value = $(e.target).val();
    $main.html(marked(value));
    updateLS();
  });

  $("body").append($note);
  $note.hide().fadeIn(300);
}

function updateLS() {
  const notes = [];

  $("textarea").each(function () {
    notes.push($(this).val());
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
