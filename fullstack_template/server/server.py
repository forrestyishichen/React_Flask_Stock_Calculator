import random
from flask import Flask, render_template, request, json

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculator')
def calculator():
	symbol = request.args.get('symbol')
	if len(symbol) == 0:
		return "Please provide valid symbol!"
	if len(request.args.get('allotment')) == 0:
		return "Please provide valid allotment!"
	else:
		allotment = float(request.args.get('allotment'))
	if len(request.args.get('fsp')) == 0:
		return "Please provide valid final share price!"
	else:
		fsp = float(request.args.get('fsp'))
	if len(request.args.get('sc')) == 0:
		return "Please provide valid sell commission!"
	else:
		sc = float(request.args.get('sc'))
	if len(request.args.get('isp')) == 0:
		return "Please provide valid initial share price!"
	else:
		isp = float(request.args.get('isp'))
	if len(request.args.get('bc')) == 0:
		return "Please provide valid buy commission!"
	else:
		bc = float(request.args.get('bc'))
	if len(request.args.get('cgtr')) == 0:
		return "Please provide valid capital gain tax rate!"
	else:
		cgtr = float(request.args.get('cgtr'))

	if allotment < 0:
		return "Please provide valid allotment!"
	if fsp < 0:
		return "Please provide valid final share price!"
	if sc < 0:
		return "Please provide valid sell commission!"
	if isp < 0:
		return "Please provide valid initial share price!"
	if bc < 0:
		return "Please provide valid buy commission!"
	if cgtr < 0:
		return "Please provide valid capital gain tax rate!"

	proceeds = ("{:,.2f}".format(allotment * fsp))
	cost = allotment * isp + bc + sc + (allotment * (fsp - isp) - bc - sc) * cgtr / 100
	pcost = "{:,.2f}".format(allotment * isp + bc + sc + (allotment * (fsp - isp) - bc - sc) * cgtr / 100)
	tpp = "{:,.2f}".format(allotment * isp)
	pallotment = "{:,.2f}".format(allotment)
	pisp = "{:,.2f}".format(isp)
	pbc = "{:,.2f}".format(bc)
	psc = "{:,.2f}".format(sc)
	pcgtr = "{:,.2f}".format(cgtr)
	gain = "{:,.2f}".format(allotment * (fsp - isp) - bc - sc)
	taxongain = "{:,.2f}".format((allotment * (fsp - isp) - bc - sc) * cgtr / 100)
	netp = "{:,.2f}".format(allotment * fsp - cost)
	returnoni = "{:,.2f}".format((allotment * fsp - cost)/(cost) * 100)
	bep = "{:,.2f}".format((allotment * isp + bc + sc) / allotment)

	result=("PROFIT REPORT:\n"
			"Proceeds\n"
			"$" + proceeds + "\n"
			"\n"
			"Cost\n"
			"$" + pcost + "\n"
			"\n"
			"Cost details:\n"
			"Total Purchase Price\n"
			"" + pallotment + " x $" + pisp + " = " + tpp + "\n"
			"Buy Commission = " + pbc + "\n"
			"Sell Commission = " + psc + "\n"
			"Tax on Capital Gain = " + pcgtr + "% of $" + gain + " = " + taxongain + "\n"
			"\n"
			"Net Profit\n"
			"$" + netp + "\n"
			"\n"
			"Return on Investment\n"
			"" + returnoni + "%\n"
			"\n"
			"To break even, you should have a final share price of\n"
			"$" + bep)

	return result

if __name__ == '__main__':
    app.run()
