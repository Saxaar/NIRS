package com.kotlinspringvue.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable

class NewActor : Serializable {


    @JsonProperty("firstName")
    var firstName: String? = null

    @JsonProperty("lastName")
    var lastName: String? = null

    @JsonProperty("email")
    var email: String? = null

    @JsonProperty("phoneNumber")
    var phoneNumber: String? = null

    constructor(firstName: String?, lastName: String?, email: String?, phoneNumber: String?) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
    }

    constructor() {}

}