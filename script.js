document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Некорректный email.';
        isValid = false;
    }


    if (password.length < 8 || password.length > 32) {
        document.getElementById('passwordError').textContent = 'Пароль должен содержать от 8 до 32 символов.';
        isValid = false;
    }


    if (isValid) {
        const data = {
            email: email,
            password: password
        };

        fetch('https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            alert('Форма отправлена!');
            console.log(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке формы');
        });
    }
});