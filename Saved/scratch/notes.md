<head>
    <style>#myDiv {position: relative;}</style>
</head>
<body>
    <script>
        function myFunction() {
            var leftvar = Math.random()*1000;
            var topvar = Math.random()*1000;

            var elem = document.getElementById('myDiv');

            elem.style.left = leftvar + 'px';
            elem.style.top  = topvar + 'px';            
        }
        window.onload = myFunction;
    </script>
    <div id="myDiv">
        <p>Test</p>
    </div>
</body>




.background {
    height: 100vh;
    /* background-image: url("https://i.imgur.com/Gt2zGiY.jpg");
    background-repeat: no-repeat;
    background-size: cover; */
    background-color: blue;
}

.user_name {
    color: white;
    text-shadow: 5px 5px 15px black;
    font-size: 30px;
    font-weight: bold;
}

.wrapper {
    /* padding: 50px; */
}