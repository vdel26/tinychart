css=$(shell ls dist/*.css)
js=$(shell ls dist/*.js)
css_file=$(notdir $(css))
js_file=$(notdir $(js))
html_file=dist/index.html

DOMAIN=tinychart.co

all:
	@echo "use 'make build' or 'make deploy'"

prepare-dist:
	@mkdir -p dist
	@touch dist/CNAME 
	@echo $(DOMAIN) > dist/CNAME

build: prepare-dist
	@echo "building dist version..."
	@cp index.html.tpl $(html_file)
	@echo "inserting compiled css and js into index.html..."
	@sed -i "" "s/{{MAINCSS}}/$(subst /,\\/,${css_file})/g" $(html_file)
	@sed -i "" "s/{{MAINJS}}/$(subst /,\\/,${js_file})/g" $(html_file)
	@say build done

deploy: build
	@echo "deploying dist/ to gh-pages remote branch..."
	git subtree push --prefix dist origin gh-pages
	@say deploy done

.PHONY: prepare-dist build deploy
