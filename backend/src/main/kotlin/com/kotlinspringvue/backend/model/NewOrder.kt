package com.kotlinspringvue.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable
import javax.persistence.Column

class NewOrder: Serializable {

    @JsonProperty("price")
    var price: String? = null

    @JsonProperty("description")
    var description: String? = null

    @JsonProperty("customerFullName")
    var customerFulLName: String? = null

    @JsonProperty("date")
    var date: String? = null

    constructor(price: String?, description: String?, customerFulLName: String?,date: String?) {
        this.price = price
        this.description = description
        this.customerFulLName = customerFulLName
        this.date = date
    }
}