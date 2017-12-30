$('#update-account').submit(function(e) {
  e.preventDefault();
  let errors = $('.error');
  let successes = $('.success');
  for (let i = 0; i < errors.length; ++i) {
    errors[i].remove();
  }
  for (let i = 0; i < successes.length; ++i) {
    successes[i].remove();
  }

  checkEmptyInputs();

  if ($('.error').length === 0) {
    const oldPassword = $('#old-password').val();
    const newPassword = $('#new-password').val();
    const confirmNewPassword = $('#confirm-new-password').val();
    axios
      .patch('/users/password', {
        oldPassword,
        newPassword,
        confirmNewPassword
      })
      .then(response => {
        const { data } = response;
        if (!data.error) {
          // Password update successful
          console.log(data);
          let successMessage = $('<label>', { class: 'success' });
          successMessage.text('Update successful');
          $('#update-account').append(successMessage);
          $('#old-password').val('');
          $('#new-password').val('');
          $('#confirm-new-password').val('');
        } else {
          let errorMessage = $('<label>', { class: 'error' });
          errorMessage.text(data.error);
          if (data.type === 'old-password') {
            $('#old-password').after(errorMessage);
          } else if (data.type === 'new-password') {
            $('#confirm-new-password').after(errorMessage);
          }
        }
      })
      .catch(err => console.log(err));
  }
});

const checkEmptyInputs = () => {
  // Check if empty inputs
  const inputIDs = ['confirm-new-password', 'new-password', 'old-password'];

  let errorMessage = $('<label>', { class: 'error' });

  inputIDs.forEach(function(id) {
    let input = $(`#${id}`);
    if (input.val() === '') {
      errorMessage.text('Field required');
      input.after(errorMessage);
    }
  });
};
