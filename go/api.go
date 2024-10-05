package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	p "path/filepath"

	"g.rg-s.com/org/go/helper/reqerr"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

func deleteFile(w http.ResponseWriter, r *http.Request) *reqerr.Err {
	e := reqerr.New("deleteFile", r.URL.Path)

	name := mux.Vars(r)["name"]
	path := p.Join(srv.paths.texts, name)

	if name == "" {
		return e.Set(fmt.Errorf("invalid name: %v", name), 500)
	}

	_, err := os.Stat(path)
	if err != nil {
		log.Info(fmt.Sprintf("file not found, see it as removed. %v", path))
		return nil
	}

	err = os.Remove(path)
	if err != nil {
		return e.Set(err, 500)
	}
	log.Infof("file removed %v\n", name)

	return nil
}

func writeFile(w http.ResponseWriter, r *http.Request) *reqerr.Err {
	e := reqerr.New("writeFile", r.URL.Path)

	name := mux.Vars(r)["name"]
	path := p.Join(srv.paths.texts, name)

	if name == "" {
		return e.Set(fmt.Errorf("invalid name: %v", name), 500)
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		return e.Set(err, 500)
	}

	err = os.WriteFile(path, body, 0664)
	if err != nil {
		return e.Set(err, 500)
	}
	log.Infof("written.\n{%s}\n", body)

	return nil
}
