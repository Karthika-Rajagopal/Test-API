{
	"info": {
		"_postman_id": "0aef7c70-8671-478c-a403-5b5b1ad9305b",
		"name": "User Movie Tests Demo",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "GET healthcheck Fail",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "2b905396-5053-40f6-be87-34c840a5f67e",
						"exec": [
							"pm.test('health check should fail', function (){",
							"    pm.response.to.have.status(401);",
							"})"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Healthcheck Pass",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "f44cc945-9fd2-4de3-87c2-a90319f68389",
						"exec": [
							"pm.test('health check should PASS', function (){",
							"    pm.response.to.have.status(200);",
							"})"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-api-key",
						"value": "MyUniqueApiKey",
						"type": "text"
					}
				],
				"url": {
					"raw": "http://localhost:3000/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Register User 1",
			"event": [
				{
					"listen": "prerequest",
					"script": {
						"id": "5e0f21df-3def-4e77-8f40-f03fbc58f1d6",
						"exec": [
							"let date = Date.now();",
							"let email = 'steve.' + date + '@themovies.org';",
							"pm.environment.set('useremail', email);"
						],
						"type": "text/javascript"
					}
				},
				{
					"listen": "test",
					"script": {
						"id": "c35b3af0-a540-4086-9d63-3ef7e03637c7",
						"exec": [
							"pm.test('Created user', function(){",
							"    pm.response.to.have.status(201);",
							"    const {data} = pm.response.json();",
							"    pm.environment.set('user1', data._id);",
							"})"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Authorization",
						"value": "",
						"type": "text",
						"disabled": true
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\": \"{{useremail}}\",\n\t\"password\":\"chupacabra\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/users/register",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "Login User 1",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "9704d448-9516-4e92-9602-f6bf9556d24f",
						"exec": [
							"pm.test('logged in', function(){",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test('has a token', function(){",
							"   const {data} = pm.response.json();",
							"   pm.environment.set('token', data.token);",
							"   return 'token' in data;",
							"});"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\":\"{{useremail}}\",\n\t\"password\":\"chupacabra\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/users/tokens/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"users",
						"tokens",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Movie User 1",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "6fb0bee2-f7be-4bbe-be7e-8e693faa42b8",
						"exec": [
							"pm.test('Created Movie for user 1', function(){",
							"    pm.response.to.have.status(201);",
							"    ",
							"    const {data} = pm.response.json();",
							"    pm.environment.set('movie1u1', data._id);",
							"})"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer {{token}}",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"title\": \"Avatar\",\n\t\"year\": 2009,\n\t\"owner\": {{user1}}\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/movies",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"movies"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Movie 2 User 1",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "96690164-5f05-4151-8d8a-73abd1cfd929",
						"exec": [
							"pm.test('Created 2nd Movie for user 1', function(){",
							"    pm.response.to.have.status(201);",
							"    ",
							"    const {data} = pm.response.json();",
							"    pm.environment.set('movie2u1', data._id);",
							"})"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Authorization",
						"type": "text",
						"value": "Bearer {{token}}"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"title\": \"Wall-E\",\n\t\"year\": 2008,\n\t\"owner\": {{user1}}\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/movies",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"movies"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get All Movies User 1",
			"event": [
				{
					"listen": "test",
					"script": {
						"id": "004b9623-4d78-4001-a403-29e99f2fb1d0",
						"exec": [
							"pm.test('got all movies', function(){",
							"    pm.response.to.have.status(200);",
							"})",
							"",
							"pm.test('list has two movies', function(){",
							"    const {data} = pm.response.json();",
							"    //list has two movies",
							"    return data.length == 2;",
							"})"
						],
						"type": "text/javascript"

						"exec": [
							"pm.test('got all movies AGAIN', function(){",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test('list has two movies', function(){",
							"    const {data} = pm.response.json();",
							"    //only one movie left",
							"    return data.length == 1;",
							"})"
						],
						"type": "text/javascript"
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"type": "text",
						"value": "Bearer {{token}}"
					}
				],
				"url": {
					"raw": "http://localhost:3000/api/movies",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"movies"
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}