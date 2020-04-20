package main

import (
	"os"
	"net/http"
	"fmt"
	"io/ioutil"
	"log"
)

func textApi(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, DELETE")
	switch r.Method {
	case "PUT":
		err := writeFile(w, r)
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), 500)
			return
		}
		return
	case "DELETE":
		err := deleteFile(w, r)
		if err != nil {
			log.Println(err)
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
	_, err := os.Stat(data + path)
	if err != nil {
		fmt.Println("file not found, so see it as removed")
		return nil
	}
	err = os.Remove(data + path)
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
