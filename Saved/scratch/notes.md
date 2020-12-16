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