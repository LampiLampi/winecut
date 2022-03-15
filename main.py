import flask
from flask import Flask
from flask import render_template
from flask import url_for


app = Flask(__name__)


@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/kunigunde")
def kunigunde():
    return render_template("kunigunde.html")


@app.route("/product")
def product():
    return render_template("product.html")


@app.route("/project")
def project():
    return render_template("project.html")


@app.route("/shop")
def shop():
    return render_template("shop.html")


@app.route("/sissi")
def sissi():
    return render_template("sissi.html")


@app.route("/amadeus")
def amadeus():
    return render_template("amadeus.html")


if __name__ == "__main__":
    app.run(debug=True)
