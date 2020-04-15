package main

import (
	"os"
	"net/http"
	"fmt"
	"io/ioutil"
)

func textApi(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "PUT":
		err := writeFile(w, r)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		return
	case "DELETE":
		err := deleteFile(w, r)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
	default:
		fmt.Fprint(w, "GET request")
	}
}

func deleteFile(w http.ResponseWriter, r *http.Request) error {
	path := r.URL.Path[len("/api/text"):]
	if path == "/" {
		return fmt.Errorf("must provied filepath")
	}
	err := os.Remove(data + path)
	if err == nil {
		fmt.Printf("removed: %v\n", path)
	}
	return err
}

func writeFile(w http.ResponseWriter, r *http.Request) error {
	path := r.URL.Path[len("/api/text"):]
	if path == "/" {
		return fmt.Errorf("must provied filepath")
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(data + path, body, 0644)
	if err == nil {
		fmt.Printf("written: %v\n{%s}\n", path, body)
	}
	return err
}